import { useState } from 'react';

import { Icon } from '@/componentes/Icon/Icon';

type CoinListProps = {
  coinsList: Array<CoinProps>;
};

type CoinProps = {
  label: string;
  value: number | string;
};

function mapCoinList(list:Array<CoinProps>, firstIndex:number, lastIndex:number) {
  return list.slice(firstIndex, lastIndex).map((coin: CoinProps) => {
    return (
      <div key={coin.label} className="flex w-full justify-between">
        <li className="text-neutral-4">{coin.label}</li>
        <li>{coin.value}</li>
      </div>
    );
  });
}

export const CoinsList = ({ coinsList }: CoinListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-1/3 flex-col items-center">
      <ul className="flex w-full flex-col space-y-4">
        { isOpen ? mapCoinList(coinsList, 0, coinsList.length) : mapCoinList(coinsList, 0, 3)  }
      </ul>
      {coinsList.length > 3 && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <Icon
            id={isOpen ? 'arrow-up-simple-line' : 'arrow-down-simple-line'}
            className="h-9 w-9"
          />
        </button>
      )}
    </div>
  );
};
