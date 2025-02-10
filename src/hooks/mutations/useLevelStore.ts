import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TLevel } from "@/lib/types";

export const useLevelsStore = () => {
  const queryClient = useQueryClient();

  const { data: currentLevel } = useQuery<TLevel | null>({
    queryKey: ["currentLevel"],
    queryFn: () =>
      queryClient.getQueryData(["currentLevel"]) || (null as TLevel | null),
  });

  const setCurrentLevel = (level: TLevel | undefined) => {
    queryClient.setQueryData(["currentLevel"], level);
  };

  const addLevel = useMutation({
    mutationFn: async (newLevel: TLevel) => newLevel,
    onMutate: async (newLevel) => {
      await queryClient.cancelQueries({ queryKey: ["levels"] });

      const previousLevels =
        queryClient.getQueryData<TLevel[]>(["levels"]) || [];

      queryClient.setQueryData(["levels"], [...previousLevels, newLevel]);

      return { previousLevels };
    },
    onError: (_, __, context) => {
      if (context?.previousLevels) {
        queryClient.setQueryData(["levels"], context.previousLevels);
      }
    },
  });

  const removeLevel = useMutation({
    mutationFn: async (levelId: string) => levelId,
    onMutate: async (levelId) => {
      await queryClient.cancelQueries({ queryKey: ["levels"] });

      const previousLevels =
        queryClient.getQueryData<TLevel[]>(["levels"]) || [];
      const newLevels = previousLevels.filter((level) => level.id !== levelId);

      queryClient.setQueryData(["levels"], newLevels);

      return { previousLevels };
    },
    onError: (_, __, context) => {
      if (context?.previousLevels) {
        queryClient.setQueryData(["levels"], context.previousLevels);
      }
    },
  });

  const updateLevel = useMutation({
    mutationFn: async ({
      levelId,
      fields,
    }: {
      levelId: string;
      fields: Partial<TLevel>;
    }) => ({ levelId, fields }),
    onMutate: async ({ levelId, fields }) => {
      await queryClient.cancelQueries({ queryKey: ["levels"] });

      const previousLevels =
        queryClient.getQueryData<TLevel[]>(["levels"]) || [];

      const newLevels = previousLevels.map((level) =>
        level.id === levelId ? { ...level, ...fields } : level
      );

      queryClient.setQueryData(["levels"], newLevels);

      return { previousLevels };
    },
    onError: (_, __, context) => {
      if (context?.previousLevels) {
        queryClient.setQueryData(["levels"], context.previousLevels);
      }
    },
  });

  const { data: levels } = useQuery<TLevel[]>({
    queryKey: ["levels"],
    queryFn: () => (queryClient.getQueryData(["levels"]) || []) as TLevel[],
  });

  return {
    levels,
    addLevel,
    removeLevel,
    updateLevel,
    currentLevel,
    setCurrentLevel,
  };
};
