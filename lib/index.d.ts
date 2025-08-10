type SortDirection = "ascending" | "descending";
interface VibeSortOptions {
    sortDirection?: SortDirection;
    propertyToSort?: string;
    apiVersion?: string;
    model?: string;
}
export declare function vibeSort<T>(arr: T[], options?: VibeSortOptions): Promise<T[]>;
export {};
//# sourceMappingURL=index.d.ts.map