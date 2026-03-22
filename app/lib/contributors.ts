export const CONTRIBUTORS_DIRECTORY_PATH = "/contributors";
export const TOP_CONTRIBUTORS_LIMIT = 10;

const GITHUB_CONTRIBUTORS_API_URL =
  "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors";
const CONTRIBUTORS_CONFIG_PATH = "/contributors-config.json";
const CONTRIBUTORS_PAGE_SIZE = 100;
const MAX_CONTRIBUTOR_PAGES = 10;

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type?: string;
}

export interface FeaturedConfig {
  username: string;
  role?: string;
  position: number;
}

export interface ContributorsConfig {
  featured: FeaturedConfig[];
}

export interface ContributorsDirectoryData {
  contributors: Contributor[];
  config: ContributorsConfig;
  totalContributions: number;
}

export const EMPTY_CONTRIBUTORS_CONFIG: ContributorsConfig = {
  featured: [],
};

let contributorsDirectoryPromise: Promise<ContributorsDirectoryData> | null = null;

function isContributor(value: unknown): value is Contributor {
  if (!value || typeof value !== "object") {
    return false;
  }

  const contributor = value as Record<string, unknown>;

  return (
    typeof contributor.id === "number" &&
    typeof contributor.login === "string" &&
    typeof contributor.avatar_url === "string" &&
    typeof contributor.html_url === "string" &&
    typeof contributor.contributions === "number"
  );
}

function isFeaturedConfig(value: unknown): value is FeaturedConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const featured = value as Record<string, unknown>;

  return (
    typeof featured.username === "string" &&
    typeof featured.position === "number" &&
    (typeof featured.role === "string" || typeof featured.role === "undefined")
  );
}

function isContributorsConfig(value: unknown): value is ContributorsConfig {
  if (!value || typeof value !== "object") {
    return false;
  }

  const config = value as Record<string, unknown>;

  return (
    Array.isArray(config.featured) && config.featured.every(isFeaturedConfig)
  );
}

function sortContributors(contributors: Contributor[]) {
  return [...contributors].sort(
    (firstContributor, secondContributor) =>
      secondContributor.contributions - firstContributor.contributions,
  );
}

function isHumanContributor(contributor: Contributor) {
  return (
    contributor.type !== "Bot" &&
    !contributor.login.toLowerCase().endsWith("[bot]")
  );
}

async function fetchContributorsPage(page: number) {
  const response = await fetch(
    `${GITHUB_CONTRIBUTORS_API_URL}?per_page=${CONTRIBUTORS_PAGE_SIZE}&page=${page}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub contributors request failed with ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isContributor).filter(isHumanContributor);
}

async function fetchContributorsConfig() {
  const response = await fetch(CONTRIBUTORS_CONFIG_PATH, {
    cache: "no-store",
  });

  if (!response.ok) {
    return EMPTY_CONTRIBUTORS_CONFIG;
  }

  const data: unknown = await response.json();
  return isContributorsConfig(data) ? data : EMPTY_CONTRIBUTORS_CONFIG;
}

async function loadContributorsDirectoryData(): Promise<ContributorsDirectoryData> {
  const contributors: Contributor[] = [];

  for (let page = 1; page <= MAX_CONTRIBUTOR_PAGES; page += 1) {
    const contributorPage = await fetchContributorsPage(page);
    contributors.push(...contributorPage);

    if (contributorPage.length < CONTRIBUTORS_PAGE_SIZE) {
      break;
    }
  }

  const sortedContributors = sortContributors(contributors);
  const config = await fetchContributorsConfig();

  return {
    contributors: sortedContributors,
    config,
    totalContributions: sortedContributors.reduce(
      (total, contributor) => total + contributor.contributions,
      0,
    ),
  };
}

export function getContributorsDirectoryData() {
  if (!contributorsDirectoryPromise) {
    contributorsDirectoryPromise = loadContributorsDirectoryData().catch(
      (error) => {
        contributorsDirectoryPromise = null;
        throw error;
      },
    );
  }

  return contributorsDirectoryPromise;
}

export function getFeaturedContributor(
  config: ContributorsConfig,
  username: string,
) {
  return config.featured.find(
    (featuredContributor) =>
      featuredContributor.username.toLowerCase() === username.toLowerCase(),
  );
}
