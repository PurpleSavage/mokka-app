import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity";

export interface LocalBackgroundMockup extends BackgroundMockupEntity {
  localUpdatedAt: Date; // para saber cuándo se guardó en el PC
  lastAccessAt: Date | null;
}