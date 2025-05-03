// TODO this is copied from src/lib/server/remote-events.ts. Put both types in a shared location
export interface Event {
    id: number; // Unique identifier for the event
    title: string;
    description?: string;
    date: string; // ISO 8601 format (e.g., '2025-01-01T12:00:00Z')
}