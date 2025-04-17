import { AnalyticsChartClient } from "./AnalyticsChartClient";

export const AnalyticsChart = ({
    data,
    category,
}: {
    data: Record<string, Record<string, unknown>> | null;
    category: string;
}) => {
    const chartData = data
        ? Object.values(data).reduce((acc: Record<string, number>, entry: Record<string, unknown>) => {
            const profile = entry.profile as Record<string, string>;
            const value = profile[category];
            if (value) acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {})
        : {};

    return (
        <AnalyticsChartClient
            chartData={chartData}
            category={category}
        />
    );
};
