import { useState } from "react";
import { surveySteps } from "../../surveyConfig";
import { SurveyData, SurveyDataEntry } from "../types";

const formatCellValue = (value: unknown): string => {
    if (typeof value === "object" && value !== null) {
        return JSON.stringify(value); // Convert objects to JSON strings
    }
    return String(value || ""); // Return value as string or an empty string for null/undefined
};

export const RawDataTable = ({ data }: { data: SurveyData | null }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const getAllColumns = () => {
        if (!data) return [];
        const orderedKeys = [
            "fname",
            "lname",
            "address",
            "address_number",
            "phone",
            "gender",
            "kupat_cholim",
            "food",
            "shops",
            "services",
            "pleasure",
            "other",
        ];
        const firstEntry = Object.values(data)[0] as SurveyDataEntry;
        const profileKeys = Object.keys(firstEntry.profile);
        const otherKeys = Object.keys(firstEntry).filter((key) => key !== "profile");
        const allKeys = [...profileKeys, ...otherKeys].filter((key) => key !== "phone_prefix");
        return orderedKeys.filter((key) => allKeys.includes(key));
    };

    const columnHeaders: Record<string, string> = {
        fname: "שם פרטי",
        lname: "שם משפחה",
        address: "כתובת",
        address_number: "מספר בית",
        phone: "טלפון",
        gender: "מגדר",
        sibiling: "סטטוס משפחתי",
        kupat_cholim: "קופת חולים",
        food: "מזון והסעדה",
        shops: "חנויות",
        services: "שירותים",
        pleasure: "בילוי ופנאי",
        other: "הערות",
    };

    const getHebrewLabel = (category: string, key: string) => {
        const step = surveySteps.find((step) => step.category === category);
        if (step && "items" in step) {
            const item = step.items.find((item) => item.key === key);
            return item ? item.label : key;
        }
        return key;
    };

    const exportToExcel = () => {
        const table = document.getElementById("raw-data-table") as HTMLTableElement;
        const rows = Array.from(table.rows);
        const csvContent = rows
            .map((row) =>
                Array.from(row.cells)
                    .map((cell) => `"${cell.textContent?.replace(/"/g, '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "survey-data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const totalRows = data ? Object.values(data).length : 0;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginatedData = data
        ? Object.values(data).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        : [];

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const renderPagination = () => (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
            >
                ראשון
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
            >
                הקודם
            </button>
            <div className="flex items-center space-x-2 space-x-reverse">
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
            >
                הבא
            </button>
            <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
            >
                אחרון
            </button>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md" dir="rtl">
            <h2 className="text-lg font-bold text-indigo-700 mb-4">Raw Data</h2>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                    Export to Excel
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                    <label htmlFor="rowsPerPage" className="text-gray-700 font-medium">
                        שורות לעמוד:
                    </label>
                    <select
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to the first page
                        }}
                        className="border border-gray-300 rounded-md p-2 bg-white text-gray-800 font-medium"
                    >
                        {[10, 50, 200, 500, 1000].map((limit) => (
                            <option key={limit} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {renderPagination()}
            <div className="overflow-x-auto">
                <table id="raw-data-table" className="w-full border-collapse border border-gray-200">
                    <thead className="bg-indigo-100">
                        <tr>
                            {getAllColumns().map((col) => (
                                <th key={col} className="border border-gray-300 p-3 text-indigo-700">
                                    {columnHeaders[col] || col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((entry: SurveyDataEntry, index) => (
                            <tr key={index} className="hover:bg-indigo-50">
                                {getAllColumns().map((col) => {
                                    if (col === "phone") {
                                        return (
                                            <td key={col} className="border border-gray-300 p-3 text-gray-700">
                                                {`${entry.profile?.phone_prefix || ""}-${entry.profile?.[col] || entry[col]}`}
                                            </td>
                                        );
                                    } else if (["food", "pleasure", "services", "shops"].includes(col)) {
                                        const categoryData = entry[col];
                                        if (typeof categoryData === "object" && categoryData !== null) {
                                            return (
                                                <td key={col} className="border border-gray-300 p-3 text-gray-700 whitespace-nowrap">
                                                    {Object.entries(categoryData).map(([key, value]) => (
                                                        <div key={key}>
                                                            {`${getHebrewLabel(col, key)}: ${value}`}
                                                        </div>
                                                    ))}
                                                </td>
                                            );
                                        }
                                    } else if (col === "other") {
                                        return (
                                            <td key={col} className="border border-gray-300 p-3 text-gray-700">
                                                {entry[col]?.comments || ""}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={col} className="border border-gray-300 p-3 text-gray-700">
                                            {formatCellValue(entry.profile?.[col] || entry[col])}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {renderPagination()}
        </div>
    );
};
