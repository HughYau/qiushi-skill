<p align="center">
  <img src="https://raw.githubusercontent.com/HughYau/qiushi-skill/main/assets/logo_main.png" width="400"/>
</p>

# Qiushi Skill: AI エージェントのための「実事求是」スキル

<p align="center">
  <strong>言語</strong>:
  <a href="./README.md">简体中文</a> |
  <a href="./README.en.md">English</a> |
  <a href="./README.ja.md">日本語</a>
</p>

> まず調査し、主要な矛盾に集中し、実践で検証し、作業が本当に完了するまでやり抜くエージェントを作りましょう。

`qiushi-skill` は、再利用可能な方法論のスキル、コマンド、セッション開始時のフックを集めたものです。一連の問題解決の方法を、Claude Code、Cursor、Codex、OpenCode、OpenClaw、Hermes Agent、その他のプロンプト駆動型ホスト向けにインストール可能なアセットにします。

## なぜこれが必要なのか

多くのエージェントはテキストを生成できますが、規律ある作業ではいまだに失敗します:

- 事実を集める前に答えてしまう
- 多すぎるタスクに力を分散させてしまう
- 最初の障害で止まってしまう
- 検証を省略して、それを「完了」と呼んでしまう

`qiushi-skill` は、1 つの中核原則と 9 つの具体的な方法でこれを正すことを目指しています:

- 指導原則としての `seeking truth from facts` (実事求是)
- 矛盾分析
- 実践 -> 認識 -> 実践の反復
- 調査第一
- 大衆路線によるフィードバックの統合
- 批判と自己批判
- 持久戦略
- 力の集中
- 星火燎原 (小さな火花が広野を焼き尽くす)
- 全体計画


> 作者の別リポジトリも応援してください!: **[AcademicForge](https://github.com/HughYau/AcademicForge)**: **One Forge, All Skills.** 複数の AI エージェントスキルを、シンプルなワンクリックのインストールコマンドで導入できるようにする、インタラクティブでクロスプラットフォームなツールです。

## インストール

### 推奨: `npx qiushi-skill`

```bash
npx qiushi-skill
```

デフォルトではインタラクティブに動作します: インストール済みのホストを検出し、適切なディレクトリにコピーします。非インタラクティブで実行する場合:

```bash
npx qiushi-skill install --target claude-code --scope user
npx qiushi-skill install --target all --scope user
npx qiushi-skill uninstall --target claude-code
```

CLI は依存関係ゼロで、ターゲットごとに `.qiushi-skill-install.json` マニフェストを書き出すため、アンインストールでは自身がインストールしたものだけを削除します。セルフチェック用の `validate` も同梱しています。

### Claude Code 公式マーケットプレイス

このリポジトリは `.claude-plugin/marketplace.json` を同梱しているため、Claude Code は GitHub から直接見つけることができます:

```text
/plugin marketplace add HughYau/qiushi-skill
/plugin install qiushi-skill@qiushi-skill
```

### ソースからのインストール

```bash
git clone https://github.com/HughYau/qiushi-skill
cd qiushi-skill
claude --plugin-dir .
```

### その他のホスト

同じ CLI で Cursor、Codex、OpenCode、OpenClaw、Hermes Agent、nanobot を対象にできます (`--target cursor|codex|opencode|openclaw|hermes|nanobot|all`)。Markdown のスキルを読み込めるホストなら、`skills/` ディレクトリをコピーするだけでも使えます。ターゲットのパスとネイティブのエントリーポイントは [`docs/platforms.md`](https://github.com/HughYau/qiushi-skill/blob/main/docs/platforms.md) に記載しています。

## 検証

推奨:

```bash
npx qiushi-skill validate
```

ソースのチェックアウトから作業している場合は、従来のフォールバックスクリプトも利用できます:

```bash
bash tests/validate.sh
# or on Windows
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

検証でチェックする項目:

- `.claude-plugin/marketplace.json` を含む JSON の妥当性
- `package.json` とマーケットプレイスのメタデータ間のバージョンの一致
- CLI ファイル、フック、コマンド、マーケットプレイスバンドルの存在
- スキル、コマンド、エージェントの frontmatter が揃っていること
- ローカルの Markdown リンクの整合性

## 使い方

セッション開始時のエントリースキルは `skills/arming-thought/SKILL.md` で、約 50 行の常時有効なカーネルです。その役割は意図的に絞り込まれています:

1. 4 つの厳格なルールで `seeking truth from facts` を徹底します: 主張は証拠に従う、事実 / 推論 / 不明を区別する、検証済みであることが完了を意味する、諦める前に診断する
2. 明らかに役立つ場合にのみ下流のスキルに振り分けます。直接実行するタスクでは何もトリガーしません
3. ホスト自身の計画 / レビュー / ToDo のフローがある場合はそちらに任せます

各方法スキルは 5 つのセクションだけを持ちます: **use / don't use** (トリガーの境界)、**procedure** (具体的な行動)、**output template** (観察可能な成果物)、**discipline** (厳格な制約)、**handoff** (通常次に使うスキル)。原典の引用や参照ガイドは同じ階層の別ファイルにあり、必要に応じて読み込まれます。

ホストが検出できる 2 つのサブエージェントが `agents/` にあります: `investigator` (読み取り専用で、事実 / 推論 / 不明の台帳を返します) と `self-critic` (物語ではなく成果物を読む、新しいコンテキストのレビュアー) です。

Markdown のスラッシュコマンドに対応したホスト向けに、手動のコマンドエントリーポイントが `commands/*.md` にあります。

## プロジェクト構成

```text
qiushi-skill/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .cursor-plugin/plugin.json
├── bin/                 # npx qiushi-skill CLI
├── skills/              # entry kernel + nine method skills + workflows
├── commands/            # manual slash-command entrypoints
├── hooks/               # SessionStart injection (POSIX + PowerShell)
├── agents/              # investigator, self-critic
├── docs/                # site page + platforms.md
├── CHANGELOG.md
├── README.md
└── README.en.md
```

## ライセンス

MIT
