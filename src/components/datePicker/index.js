import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ButtonField(props) {
  const {
    toggleVisibility,
    id,
    disabled,
    value,
    disableFuture,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;
  return (
    <IconButton
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label="delete"
      onClick={toggleVisibility}
      disableRipple={true}
    >
      <CalendarMonthOutlinedIcon sx={{ color: "#FFBC00" }} />
      {!disableFuture ? (
        <span className="pl-[5px] md:pl-[7px] lg:pl-[10px] text-black font-semibold text-[14px] tracking-tight lg:tracking-normal font-sens lg:text-[16px] xl:text-[17px]">
          {dayjs(value).format("ddd, D MMM")}
        </span>
      ) : null}
    </IconButton>
  );
}

ButtonField.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputProps: PropTypes.shape({
    "aria-label": PropTypes.string,
  }),
  InputProps: PropTypes.shape({
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
  }),
  label: PropTypes.node,
  setOpen: PropTypes.func,
};

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  const toggleVisibility = () => setOpen(!open);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { toggleVisibility } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      defaultValue={dayjs()}
      disableFuture={props.disableFuture && props.disableFuture}
      disablePast={!props.disableFuture && true}
    />
  );
}

ButtonDatePicker.propTypes = {
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.any,
};

function DatePickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={1}>
        <ButtonDatePicker
          disabled={props?.disabled}
          value={props?.value}
          onChange={(newValue) => props?.newDate(newValue)}
          disableFuture={props?.disableFuture}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DatePickers;
