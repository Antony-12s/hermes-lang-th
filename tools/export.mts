// Dump English desktop/tui catalogs as flat {key: text}; functions -> positional {0} strings
import { writeFileSync } from 'node:fs'
const which = process.argv[2]
const mod = which === 'tui'
  ? await import(process.env.HA + '/ui-tui/src/i18n/en.ts')
  : await import(process.env.HA + '/apps/desktop/src/i18n/en.ts')
const out: Record<string, string> = {}, bad: string[] = []
const walk = (node: any, prefix: string) => {
  for (const [k, v] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'function') {
      const args = Array.from({ length: Math.max(v.length, 0) }, (_, i) => `{${i}}`)
      try { out[path] = String(v(...args)) } catch { bad.push(path); out[path] = args.join(' ') }
    } else if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, path)
    else if (typeof v === 'string') out[path] = v
    else bad.push(path)
  }
}
walk(mod.en, '')
// usage (cwd = ui-tui or apps/desktop so tsconfig paths resolve): HA=<repo> tsx export.mts <tui|desktop> [out.json]
writeFileSync(process.argv[3] ?? `en.${which}.json`, JSON.stringify(out, null, 1))
console.log(which, Object.keys(out).length, 'bad', bad.length, bad.slice(0, 10))
