export type jsonData = {
    date: string;
    hasError: boolean;
    fields: [
        {
            id: string;
            prop: string;
            value: string;
            hasError: boolean;
        }
    ];
};
