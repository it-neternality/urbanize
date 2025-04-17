"use client";

export const RawDataTable = ({ data }: { data: Record<string, any> | null }) => {
    const getAllColumns = () => {
        if (!data) return [];
        const firstEntry = Object.values(data)[0];
        const profileKeys = firstEntry?.profile ? Object.keys(firstEntry.profile) : [];
        const otherKeys = Object.keys(firstEntry).filter((key) => key !== "profile");
        return [...profileKeys, ...otherKeys];
    };

    const formatCellValue = (value: any) => {
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value); // Convert objects to JSON strings
        }
        return value || ""; // Return value or an empty string for null/undefined
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-indigo-700 mb-4">Raw Data</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-indigo-100">
                        <tr>
                            {getAllColumns().map((col) => (
                                <th key={col} className="border border-gray-300 p-3 text-indigo-700">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            Object.values(data).map((entry: any, index) => (
                                <tr key={index} className="hover:bg-indigo-50">
                                    {getAllColumns().map((col) => (
                                        <td key={col} className="border border-gray-300 p-3 text-gray-700">
                                            {formatCellValue(entry.profile?.[col] || entry[col])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
