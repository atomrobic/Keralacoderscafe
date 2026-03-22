"use client";

import { useEffect, useState } from "react";
import {
  EMPTY_CONTRIBUTORS_CONFIG,
  getContributorsDirectoryData,
  type Contributor,
  type ContributorsConfig,
} from "./contributors";

type ContributorsDataState = {
  contributors: Contributor[];
  config: ContributorsConfig;
  totalContributions: number;
  loading: boolean;
  error: string | null;
};

const INITIAL_STATE: ContributorsDataState = {
  contributors: [],
  config: EMPTY_CONTRIBUTORS_CONFIG,
  totalContributions: 0,
  loading: true,
  error: null,
};

export function useContributorsData() {
  const [state, setState] = useState<ContributorsDataState>(INITIAL_STATE);

  useEffect(() => {
    let ignore = false;

    getContributorsDirectoryData()
      .then((data) => {
        if (ignore) {
          return;
        }

        setState({
          contributors: data.contributors,
          config: data.config,
          totalContributions: data.totalContributions,
          loading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (ignore) {
          return;
        }

        console.error("Error loading contributors:", error);

        setState((currentState) => ({
          ...currentState,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Unable to load contributors right now.",
        }));
      });

    return () => {
      ignore = true;
    };
  }, []);

  return state;
}
