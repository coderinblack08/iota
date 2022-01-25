export enum BlockType {
  Note = "note",
  Chat = "chat",
  Image = "image",
  Album = "album",
  Journal = "journal",
}

export interface Block {
  type?: BlockType;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
