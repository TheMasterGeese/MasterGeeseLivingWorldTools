/// <reference types="jquery" />
import MiniSearch from "minisearch";
/** Extend CompendiumDirectory to support a search bar */
export declare class CompendiumDirectoryPF2e extends CompendiumDirectory {
    #private;
    readonly searchEngine: MiniSearch<CompendiumIndexData>;
    constructor(options?: ApplicationOptions);
    /** Whether this application is in search mode */
    private get searchMode();
    /** Include ability to search and drag document search results */
    static override: any;
    get defaultOptions(): ApplicationOptions;
    override: any;
    getData(options?: Partial<ApplicationOptions>): CompendiumDirectoryDataPF2e;
    override: any;
    activateListeners($html: JQuery): void;
    /** Add a context menu for content search results */
    protected override: any;
    _contextMenu($html: JQuery): void;
    /** System compendium search */
    protected override: any;
    _onSearchFilter(_event: KeyboardEvent, query: string): void;
    /** Anyone can drag from search results */
    protected override: any;
    _canDragStart(): boolean;
    /** Replicate the functionality of dragging a compendium document from an open `Compendium` */
    protected override: any;
    _onDragStart(event: ElementDragEvent): void;
    /** Reindex compendiums to include image path (workaround of V9 bug) and compile search index */
    onReady(): Promise<void>;
}
interface CompendiumDirectoryDataPF2e extends CompendiumDirectoryData {
    searchContents: boolean;
}
export {};
