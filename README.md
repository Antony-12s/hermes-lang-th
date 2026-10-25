# hermes-lang-th

Thai UI language pack for [Hermes Agent](https://github.com/NousResearch/hermes-agent), cheeky "กวนตีน" edition.
Covers the CLI/gateway (`th.yaml`), the TUI (`th.tui.yaml`) and the Desktop app (`th.desktop.yaml`).

```bash
hermes plugins install Antony-12s/hermes-lang-th
hermes plugins enable hermes-lang-th
hermes config set display.language th
```

Reload the Desktop window (Ctrl+R) afterwards.

## Keeping up with Hermes updates

`tools/langpack.py export|diff|merge` exports the current English catalogs, lists new or changed strings
for translation (per `tools/GUIDE.md`), and merges the translations back. `tools/after-update.sh` runs the
diff after `hermes update` and sends a desktop notification when the pack is behind.
