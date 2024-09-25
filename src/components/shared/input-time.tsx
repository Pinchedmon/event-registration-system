import React from "react";
import { Input } from "../ui/input";

interface InputTimeProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  value: Date;
  label: string;
}

const InputTime: React.FC<InputTimeProps> = ({
  onDateChange,
  onTimeChange,
  value,
  label,
}) => {
  const [date, setDate] = React.useState(value);
  const [time, setTime] = React.useState(
    `${value.getHours()}:${value.getMinutes()}`,
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <label>{label}</label>
      <Input
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      <Input type="time" value={time} onChange={handleTimeChange} />
    </div>
  );
};

export default InputTime;
