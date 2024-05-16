import { SettingItem_ActionStyle } from "@/models/enums/SettingItem_ActionStyle";

export type SettingAction =
  | { type: SettingItem_ActionStyle.CHEVRON; OnPress: () => void }
  | {
      type: SettingItem_ActionStyle.TOGGLE;
      SwitchValue: boolean;
      SwitchOnValueChange: ((value: boolean) => void | Promise<void>) | null | undefined;
    };
