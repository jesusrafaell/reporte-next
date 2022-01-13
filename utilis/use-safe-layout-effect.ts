import { useLayoutEffect, useEffect } from 'react';
const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useSafeLayoutEffect;
