export declare class StringHelper {
    static generatePersonalizedHtmlFromTemplateAndValues(template: string, values: any): string;
    static generateObjectFromColumnsAndInfo({ info, columns, }: {
        info: Record<any, number>;
        columns: string[];
    }): any;
}
