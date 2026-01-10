import React from 'react';
import { useGetStartupConfig, useGetUserBalance } from '~/data-provider';
import { useAuthContext, useLocalize } from '~/hooks';
import TokenCreditsItem from './TokenCreditsItem';
import AutoRefillSettings from './AutoRefillSettings';

function Balance() {
  const localize = useLocalize();
  const { isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();

  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && !!startupConfig?.balance?.enabled,
  });
  const balanceData = balanceQuery.data;

  const {
    tokenCredits = 0,
    autoRefillEnabled = false,
    lastRefill,
    refillAmount,
    refillIntervalUnit,
    refillIntervalValue,
  } = balanceData ?? {};

  const hasValidRefillSettings =
    lastRefill !== undefined &&
    refillAmount !== undefined &&
    refillIntervalUnit !== undefined &&
    refillIntervalValue !== undefined;

  return (
    <div className="flex flex-col gap-4 p-4 text-sm text-text-primary">
      {/* Token credits display */}
      <TokenCreditsItem tokenCredits={tokenCredits} />

      {/* Buy tokens button */}
      <a
        href="https://flowwithava.com"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center justify-center
          rounded-md border border-border-light
          bg-surface-primary
          px-4 py-2
          text-sm font-medium
          text-text-primary
          hover:bg-surface-hover
          transition-colors
        "
      >
        Buy tokens
      </a>

      {/* Auto-refill display */}
      {autoRefillEnabled ? (
        hasValidRefillSettings ? (
          <AutoRefillSettings
            lastRefill={lastRefill}
            refillAmount={refillAmount}
            refillIntervalUnit={refillIntervalUnit}
            refillIntervalValue={refillIntervalValue}
          />
        ) : (
          <div className="text-sm text-red-600">
            {localize('com_nav_balance_auto_refill_error')}
          </div>
        )
      ) : (
        <div className="text-sm text-gray-600">
          {localize('com_nav_balance_auto_refill_disabled')}
        </div>
      )}
    </div>
  );
}

export default React.memo(Balance);

