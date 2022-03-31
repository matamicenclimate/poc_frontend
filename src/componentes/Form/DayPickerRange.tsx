import { useController } from 'react-hook-form';
import { DateRange, DayPicker } from 'react-day-picker';
import { addDays, addMonths, addWeeks, addYears, format } from 'date-fns';
import { Button } from '@/componentes/Elements/Button/Button';
import { useState } from 'react';

export const DayPickerRange = ({ control, name }: any) => {
  const [range, setRange] = useState<'week' | 'month' | 'year' | undefined>(undefined);
  const { field } = useController({
    name,
    control,
    // rules: { required },
    defaultValue: {
      from: new Date(),
      to: addWeeks(new Date(), 1),
    },
  });

  const handleSelect = (data: DateRange | undefined, selected: Date) => {
    if (range === 'week') {
      field.onChange({ from: selected, to: addDays(selected, 7) });
    } else if (range === 'month') {
      field.onChange({ from: selected, to: addMonths(selected, 1) });
    } else if (range === 'year') {
      field.onChange({ from: selected, to: addYears(selected, 1) });
    } else {
      field.onChange(data);
    }
  };
  return (
    <div>
      <DayPicker
        mode="range"
        defaultMonth={new Date()}
        selected={field.value}
        onSelect={handleSelect}
        numberOfMonths={2}
      />
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="light"
          size="sm"
          onClick={() => {
            setRange(undefined);
            field.onChange({ from: undefined, to: undefined });
          }}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant={range === undefined ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange(undefined);
          }}
        >
          Custom
        </Button>{' '}
        <Button
          type="button"
          variant={range === 'week' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('week');
          }}
        >
          Week
        </Button>
        <Button
          type="button"
          variant={range === 'month' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('month');
          }}
        >
          Month
        </Button>
        <Button
          type="button"
          variant={range === 'year' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('year');
          }}
        >
          Year
        </Button>
      </div>
    </div>
  );
};
