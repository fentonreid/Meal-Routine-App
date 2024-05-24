import SettingsContextProvider from "@/store/SettingsContext";
import AppWrapper from "@/AppWrapper";
import { ColourThemeWrapper } from "./_layout";

export default function RootLayout() {
  return (
    <>
      <AppWrapper>
        <SettingsContextProvider>
          <ColourThemeWrapper />
        </SettingsContextProvider>
      </AppWrapper>
    </>
  );
}
