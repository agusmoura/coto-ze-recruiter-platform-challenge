interface ResultsCounterProps {
  totalItems: number;
}

export function ResultsCounter({ totalItems }: ResultsCounterProps) {
  if (totalItems === 0) {
    return <span>No se encontraron resultados</span>;
  }

  return (
    <span>
      Mostrando{" "}
      <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
      {totalItems === 1 ? "candidato" : "candidatos"}
    </span>
  );
}
