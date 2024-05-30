import { SettingsContext } from "@/store/SettingsContext";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { MarkedDates } from "react-native-calendars/src/types";

interface Props {
  dateSelectedHandler: (start: string, end: string) => void;
}

const CalendarComponent = ({ dateSelectedHandler }: Props) => {
  const { colours } = useContext(SettingsContext);

  const [selectedStartDate, _] = useState(moment().format("YYYY-MM-DD"));
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  // Utility function to generate marked dates between start and end date state properties
  const generateMarkedDates = (start: string, end: string): MarkedDates => {
    const dates: MarkedDates = {};
    let currentDate = moment(start);

    // If end is undefined
    if (end === null || end === "") {
      dates[currentDate.format("YYYY-MM-DD")] = {
        selected: true,
        marked: true,
        startingDay: true,
        endingDay: true,
        color: colours.darkPrimary,
        dotColor: colours.accent,
      };

      return dates;
    }

    while (currentDate.isSameOrBefore(end)) {
      let currentMarkedDate: MarkingProps = {};

      currentMarkedDate = {
        selected: true,
        color: colours.lightPrimary,
      };

      // Determine if this is a start or end date
      if (currentDate.format("YYYY-MM-DD") === start) {
        currentMarkedDate = {
          selected: true,
          marked: true,
          startingDay: true,
          color: colours.primary,
        };
      } else if (currentDate.format("YYYY-MM-DD") === end) {
        currentMarkedDate = {
          selected: true,
          marked: true,
          endingDay: true,
          color: colours.primary,
        };
      }

      // Update marked date
      dates[currentDate.format("YYYY-MM-DD")] = currentMarkedDate;

      // Increment currentDate
      currentDate = currentDate.add(1, "days");
    }

    return dates;
  };

  // Set the marked dates when the component mounts
  useEffect(() => {
    const dates = generateMarkedDates(selectedStartDate, selectedEndDate);
    setMarkedDates(dates);

    // Update parent component that start and end dates have been updated
    dateSelectedHandler(selectedStartDate, selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const onDayPress = (day: DateData) => {
    // Prevent start and end date being the same day
    if (day.dateString === selectedStartDate) return;

    // Allow disabling of end date if the same end date is selected again
    if (day.dateString === selectedEndDate) {
      setSelectedEndDate("");
      return;
    }

    // Set end date
    setSelectedEndDate(day.dateString);
  };

  return (
    <Calendar
      onDayPress={onDayPress}
      markingType={"period"}
      markedDates={markedDates}
      enableSwipeMonths={false}
      disableMonthChange={true}
      hideArrows={moment().isSame(moment().add(10, "days"), "month")}
      minDate={selectedStartDate}
      maxDate={moment().add(10, "days").format("YYYY-MM-DD")}
      theme={{
        textMonthFontSize: 24,
        textDayHeaderFontSize: 14,
        monthTextColor: colours.mainHeading,
        arrowColor: colours.accent,
        dotColor: colours.accent,
        textMonthFontFamily: "Poppins",
      }}
      style={{
        borderRadius: 12,
        opacity: 4,
      }}
    />
  );
};

export default CalendarComponent;
