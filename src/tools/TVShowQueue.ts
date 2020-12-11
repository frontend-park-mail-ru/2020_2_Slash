class TVShowQueue {
    GetNextEpisode(currentEpisode: number, currentSeason: number, queue: any) {
        return currentEpisode + 1 === queue.seasons[currentSeason].episodes_number ?
            {season: currentSeason + 1, episode: 0} : {season: currentSeason, episode: currentEpisode + 1};
    }

    GetPrevEpisode(currentEpisode: number, currentSeason: number, queue: any) {
        return currentEpisode - 1 === -1 ?
            {season: currentSeason - 1, episode: queue.seasons[currentSeason - 1].episodes_number - 1} :
            {season: currentSeason, episode: currentEpisode - 1};
    }

    isLastEpisode(currentEpisodeIndex: number, currentSeasonIndex: number, queue: any) {
        const lastSeasonsIndex = queue.seasons.length - 1;
        const lastEpisodeIndex: number = queue.seasons[lastSeasonsIndex].episodes.length - 1;
        return currentEpisodeIndex === lastEpisodeIndex && currentSeasonIndex === lastSeasonsIndex;
    }

    isFirstEpisode(currentEpisodeIndex: number, currentSeasonIndex: number) {
        return (currentEpisodeIndex === 0) && (currentSeasonIndex === 0);
    }
}

export default new TVShowQueue();
