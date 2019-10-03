export default function (template: TemplateStringsArray, ...substitutions: any[]) {
  substitutions = substitutions.concat('')
  const filterEmpty = (s: any) =>
    [null, undefined, false].includes(s)
      ? '' : s
  const mapTpl = (tpl: string, i: number) =>
    tpl + filterEmpty(substitutions[i])
  return template
    .map(mapTpl)
    .join('')
}
