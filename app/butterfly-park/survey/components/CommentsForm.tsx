import { CommentStep } from "../types";

interface CommentsFormProps {
    step: CommentStep;
    comments: string;
    onCommentsChange: (value: string) => void;
}

export const CommentsForm = ({
    step,
    comments,
    onCommentsChange
}: CommentsFormProps) => {
    return (
        <div>
            <div className="mb-8 text-center relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-green-200 rounded-full opacity-30 blur-xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-xl"></div>

                <div className="inline-block py-3 px-6 bg-gradient-to-r from-indigo-600 to-green-600 rounded-xl shadow-lg mb-2">
                    <h2 className="text-2xl font-bold mb-1 text-white">{step.title}</h2>
                    <p className="text-white opacity-90">{step.description}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-green-500 to-blue-500"></div>
                <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-green-100 rounded-full opacity-40"></div>

                <textarea
                    value={comments}
                    onChange={(e) => onCommentsChange(e.target.value)}
                    rows={8}
                    placeholder="נשמח לקבל הצעות או רעיונות נוספים (תוכלו גם להציע שם למרכז)"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none shadow-inner text-lg relative z-10"
                    style={{ direction: "rtl" }}
                />
            </div>
        </div>
    );
};
