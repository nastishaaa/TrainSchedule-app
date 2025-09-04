type Duration = {
    hours?: number;
    minutes?: number;
}

export const formatDuration = (duration?: Duration): string => {
    if (!duration) return '';
    const h = duration.hours || 0;
    const m = duration.minutes || 0;
    return `${h}h ${m}m`;
}
