/**
 * Money Formatter Utility
 * Provides various formatting options for currency and large numbers
 */

export interface FormatOptions {
    currency?: string;
    compact?: boolean;
    decimals?: number;
    showCurrency?: boolean;
    locale?: string;
}

/**
 * Format a number with thousand separators
 * Example: 1234567 -> "1,234,567"
 */
export function formatWithCommas(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format large numbers in compact form (K, M, B, T)
 * Examples:
 * - 1500 -> "1.5K"
 * - 2000000 -> "2M"
 * - 3500000000 -> "3.5B"
 */
export function formatCompact(value: number, decimals: number = 1): string {
    if (value === 0) return "0";

    const absValue = Math.abs(value);
    const sign = value < 0 ? "-" : "";

    const units = [
        { value: 1e12, symbol: "T" }, // Trillion
        { value: 1e9, symbol: "B" },  // Billion
        { value: 1e6, symbol: "M" },  // Million
        { value: 1e3, symbol: "K" },  // Thousand
    ];

    for (const unit of units) {
        if (absValue >= unit.value) {
            const formatted = (absValue / unit.value).toFixed(decimals);
            // Remove trailing zeros and decimal point if not needed
            const cleaned = formatted.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
            return `${sign}${cleaned}${unit.symbol}`;
        }
    }

    return `${sign}${absValue}`;
}

/**
 * Format money with currency symbol
 * Examples:
 * - formatMoney(1234567) -> "1,234,567 RWF"
 * - formatMoney(1234567, { compact: true }) -> "1.2M RWF"
 * - formatMoney(1234567, { currency: "USD" }) -> "$1,234,567"
 */
export function formatMoney(
    value: number | null | undefined,
    options: FormatOptions = {}
): string {
    if (value === null || value === undefined) return "0";

    const {
        currency = "",
        compact = false,
        decimals = compact ? 1 : 0,
        showCurrency = true,
        locale = "en-US"
    } = options;

    let formatted: string;

    if (compact) {
        formatted = formatCompact(value, decimals);
    } else {
        formatted = formatWithCommas(Math.round(value));
    }

    if (!showCurrency) {
        return formatted;
    }

    // Handle different currency formats
    switch (currency.toUpperCase()) {
        case "USD":
            return `$${formatted}`;
        case "EUR":
            return `€${formatted}`;
        case "GBP":
            return `£${formatted}`;
        case "RWF":
        default:
            return `${formatted} ${currency}`;
    }
}

/**
 * Format percentage
 * Example: formatPercentage(0.456) -> "45.6%"
 */
export function formatPercentage(value: number, decimals: number = 1): string {
    return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format progress as percentage
 * Example: formatProgress(75000, 100000) -> "75%"
 */
export function formatProgress(current: number, target: number, decimals: number = 0): string {
    if (target === 0) return "0%";
    const percentage = (current / target) * 100;
    return `${Math.min(percentage, 100).toFixed(decimals)}%`;
}

/**
 * Pad a number with leading zeros
 * Example: padNumber(5, 3) -> "005"
 */
export function padNumber(value: number, length: number = 2): string {
    return value.toString().padStart(length, "0");
}

/**
 * Format currency with padding for consistent display
 * Example: formatMoneyPadded(1234, 10) -> "    1,234 RWF"
 */
export function formatMoneyPadded(
    value: number,
    totalLength: number = 15,
    options: FormatOptions = {}
): string {
    const formatted = formatMoney(value, options);
    return formatted.padStart(totalLength, " ");
}

/**
 * Parse formatted money string back to number
 * Example: parseMoney("1,234,567 RWF") -> 1234567
 */
export function parseMoney(value: string): number {
    // Remove currency symbols, commas, and spaces
    const cleaned = value.replace(/[^0-9.-]/g, "");
    return parseFloat(cleaned) || 0;
}

/**
 * Format money range
 * Example: formatMoneyRange(1000, 5000) -> "1K - 5K RWF"
 */
export function formatMoneyRange(
    min: number,
    max: number,
    options: FormatOptions = {}
): string {
    const { currency = "", compact = true } = options;
    const minFormatted = formatMoney(min, { ...options, compact, showCurrency: false });
    const maxFormatted = formatMoney(max, { ...options, compact, showCurrency: false });
    return `${minFormatted} - ${maxFormatted} ${currency}`;
}

/**
 * Get appropriate compact format based on value size
 * Automatically determines best format
 */
export function formatSmart(value: number, options: FormatOptions = {}): string {
    const absValue = Math.abs(value);

    // Use compact format for large numbers (>= 10,000)
    if (absValue >= 10000) {
        return formatMoney(value, { ...options, compact: true });
    }

    // Use full format for smaller numbers
    return formatMoney(value, { ...options, compact: false });
}

/**
 * Format donation amount with appropriate styling
 * Example: formatDonation(1500000) -> "1.5M RWF"
 */
export function formatDonation(value: number | null | undefined): string {
    return formatMoney(value, { compact: true, currency: "" });
}

/**
 * Format project funding goal
 * Example: formatFundingGoal(5000000) -> "5M RWF"
 */
export function formatFundingGoal(value: number): string {
    return formatMoney(value, { compact: true, currency: "", decimals: 1 });
}

/**
 * Format raised amount vs goal
 * Example: formatFundingStatus(3500000, 5000000) -> "3.5M / 5M RWF (70%)"
 */
export function formatFundingStatus(raised: number, goal: number): string {
    const raisedFormatted = formatMoney(raised, { compact: true, showCurrency: false });
    const goalFormatted = formatMoney(goal, { compact: true, showCurrency: false });
    const percentage = formatProgress(raised, goal);
    return `${raisedFormatted} / ${goalFormatted} RWF (${percentage})`;
}

export default {
    formatWithCommas,
    formatCompact,
    formatMoney,
    formatPercentage,
    formatProgress,
    padNumber,
    formatMoneyPadded,
    parseMoney,
    formatMoneyRange,
    formatSmart,
    formatDonation,
    formatFundingGoal,
    formatFundingStatus,
};
