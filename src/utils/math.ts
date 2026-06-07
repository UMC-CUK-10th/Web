export const findPrimeNumbers = (max: number): number[] => {
  const sieve = new Array(max + 1).fill(true);
  
  sieve[0] = false;
  sieve[1] = false;

  // 제곱근까지만 루프를 돌며 배수들을 지워나감
  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= max; j += i) {
        sieve[j] = false;
      }
    }
  }

  // true로 남은 인덱스(소수)만 모아서 배열로 반환
  return sieve
    .map((isPrime, index) => (isPrime ? index : null))
    .filter((val): val is number => val !== null);
};