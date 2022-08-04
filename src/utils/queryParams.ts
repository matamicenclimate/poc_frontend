function getFromFilter(filter: Record<string, unknown>):string {
  const newFilter: Record<string, string> = {};
  Object.keys(filter).forEach(function (key) {
    if (typeof filter[key] === 'undefined' || filter[key] === null || filter[key] === '') {
      return;
    } else {
      newFilter[key] = filter[key] as string;
    }
  });

  const params = new URLSearchParams({
    ...newFilter,
  }).toString();

  return params;
}

export {
  getFromFilter,
}
