import moment from "moment";

export const MomentToUTCDateStart = (date: string) => {
  return new Date(
    moment(date)
      .startOf("day")
      .add(moment(date).utcOffset(), "minutes")
      .toISOString()
  );
};

export const MomentToUTCDateEnd = (date: string) => {
  return new Date(
    moment(date)
      .endOf("day")
      .add(moment(date).utcOffset(), "minutes")
      .toISOString()
  );
};
