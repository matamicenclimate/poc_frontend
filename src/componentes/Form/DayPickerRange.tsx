import { useController } from 'react-hook-form';
import { DateRange, DayPicker } from 'react-day-picker';
import { addDays, addMonths, addWeeks, addYears } from 'date-fns';
import { Button } from '@/componentes/Elements/Button/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';

export const DayPickerRange = ({ control, name }: any) => {
  const { t, i18n } = useTranslation();
  const [range, setRange] = useState<'day' | 'week' | 'month' | 'year' | 'all' | undefined>(
    undefined
  );

  function getCurrentLocale() {
    if (i18n.language === 'es') {
      return es;
    } else if (i18n.language === 'fr') {
      return fr;
    }
    return enUS;
  }

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
    if (range === 'day') {
      field.onChange({ from: selected, to: addDays(selected, 1) });
    } else if (range === 'week') {
      field.onChange({ from: selected, to: addWeeks(selected, 1) });
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
        locale={getCurrentLocale()}
        defaultMonth={new Date()}
        selected={field.value}
        onSelect={handleSelect}
        numberOfMonths={2}
      />
      <div className="flex space-x-2">
        <Button
          type="button"
          variant={range === undefined ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange(undefined);
          }}
        >
          {t('components.DayPickerRange.ranges.custom')}
        </Button>
        <Button
          type="button"
          variant={range === 'day' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('day');
            field.onChange({ from: field.value.from, to: addDays(field.value.from, 1) });
          }}
        >
          {t('components.DayPickerRange.ranges.day')}
        </Button>
        <Button
          type="button"
          variant={range === 'week' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('week');
            field.onChange({ from: field.value.from, to: addWeeks(field.value.from, 1) });
          }}
        >
          {t('components.DayPickerRange.ranges.week')}
        </Button>
        <Button
          type="button"
          variant={range === 'month' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('month');
            field.onChange({ from: field.value.from, to: addMonths(field.value.from, 1) });
          }}
        >
          {t('components.DayPickerRange.ranges.month')}
        </Button>
        <Button
          type="button"
          variant={range === 'year' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('year');
            field.onChange({ from: field.value.from, to: addYears(field.value.from, 1) });
          }}
        >
          {t('components.DayPickerRange.ranges.year')}
        </Button>
        <Button
          type="button"
          variant={range === 'all' ? 'primary' : 'light'}
          size="sm"
          onClick={() => {
            setRange('all');
            field.onChange({ from: Date.now(), to: undefined });
          }}
        >
          {t('components.DayPickerRange.ranges.all')}
        </Button>
      </div>
    </div>
  );
};
