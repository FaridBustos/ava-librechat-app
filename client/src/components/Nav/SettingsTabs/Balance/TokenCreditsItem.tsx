import React from 'react';
import { Label, InfoHoverCard, ESide } from '@librechat/client';
import { useLocalize } from '~/hooks';

interface TokenCreditsItemProps {
  tokenCredits?: number;
}

const TokenCreditsItem: React.FC<TokenCreditsItemProps> = ({ tokenCredits }) => {
  const localize = useLocalize();

  return (
    <div className="flex flex-col space-y-2">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label className="font-light">{localize('com_nav_balance')}</Label>
          <InfoHoverCard side={ESide.Bottom} text={localize('com_nav_info_balance')} />
        </div>

        <span
          className="text-sm font-medium text-gray-800 dark:text-gray-200"
          role="note"
        >
          {tokenCredits !== undefined ? tokenCredits.toFixed(2) : '0.00'}
        </span>
      </div>

      {/* Buy more tokens button */}
      <a
        href="https://flowwithava.com"
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-sm
          font-medium
          text-blue-600
          hover:text-blue-700
          dark:text-blue-400
          dark:hover:text-blue-300
          transition-colors
        "
      >
        Buy more tokens
      </a>
    </div>
  );
};

export default TokenCreditsItem;

