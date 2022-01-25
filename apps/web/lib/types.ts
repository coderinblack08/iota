export enum BlockType {
  Note = "note",
  Chat = "chat",
  Image = "image",
  Album = "album",
  Journal = "journal",
}

export interface Block {
  id?: string;
  type?: BlockType;
  position: BlockPosition;
  size: BlockSize;
  text: string;
}

export interface BlockPosition {
  x: number;
  y: number;
}

export interface BlockSize {
  width: number;
  height: number;
}
