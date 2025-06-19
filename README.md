# 🔐 パスワード強度シミュレーター

脆弱なパスワードの危険性を**実際に体験**できる教育用ウェブアプリケーションです。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-blue?style=for-the-badge)](https://tamaden55.github.io/Password-Strength-Simulator/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## 🚀 ライブデモ

**👉 [https://tamaden55.github.io/Password-Strength-Simulator/](https://tamaden55.github.io/Password-Strength-Simulator/)**

![デモ画面](https://user-images.githubusercontent.com/your-image-placeholder.png)

## 💡 なぜこのツールを作ったのか

身の回りに**4桁数字**や**簡単なパスワード**を使っている人が多いことに気づき、その危険性を視覚的に理解してもらうために開発しました。

### 🎯 体験できること

- **4桁数字PIN**: 数秒で破られる現実
- **文字種類を増やす効果**: 劇的なセキュリティ向上
- **パスワード長の重要性**: 1文字増やすだけで大きな変化
- **実際のブルートフォース攻撃**: リアルタイムシミュレーション

## ✨ 主な機能

### 📝 パスワード生成
- **数字** (0-9)
- **英小文字** (a-z) 
- **英大文字** (A-Z)
- **特殊文字** (!@#$%^&*)
- **1〜20文字**まで自由に設定

### 💪 強度可視化
- 文字セットサイズの表示
- 総組み合わせ数の計算
- 破られる予想時間の表示
- 視覚的な強度バー

### 💥 ブルートフォース シミュレーション
- **実際の総当たり攻撃**をリアルタイム実行
- 試行回数と経過時間をライブ表示
- パスワードが破られるまでの実時間を測定
- 10分超の場合は自動的に実行を制限

## 📊 実際の体験例

| パスワード例 | 文字セット | 予想時間 | シミュレーション |
|-------------|-----------|----------|-----------------|
| `1234` | 数字4桁 | **数秒** | ✅ 可能 |
| `123456` | 数字6桁 | **数分** | ✅ 可能 |
| `abc123` | 英数字6桁 | **数時間** | ❌ 制限 |
| `Abc123!` | 英数字+記号7桁 | **数年** | ❌ 制限 |

## 🎬 デモ手順

### 1. 弱いパスワードの危険性を実演
```
設定: 数字のみ、4桁
結果: 数秒で破られることを実際に体験
```

### 2. 文字種類を増やす効果を確認
```
設定: 数字 + 英小文字、6桁
結果: 劇的に時間が延びることを確認
```

### 3. 強力なパスワードの効果
```
設定: 数字 + 英大小文字 + 記号、8桁以上
結果: 「シミュレーション不可」で安全性を実感
```

## 🛠️ 技術仕様

- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **レスポンシブデザイン**対応
- **サーバー不要**（完全にクライアントサイド）
- **GitHub Pages**でホスティング

### ファイル構成
```
Password-Strength-Simulator/
├── index.html      # メインページ
├── script.js       # JavaScript ロジック
├── README.md       # このファイル
└── .gitignore      # Git設定
```

## 🎓 教育・啓発での活用

### 企業研修
- 社員のセキュリティ意識向上
- パスワードポリシーの説明資料

### 学校教育
- 情報セキュリティ授業
- デジタルリテラシー教育

### 個人利用
- 家族・友人への啓発
- SNSでのセキュリティ啓発

## 💻 ローカル実行

```bash
# リポジトリをクローン
git clone https://github.com/tamaden55/Password-Strength-Simulator.git

# ディレクトリに移動
cd Password-Strength-Simulator

# ブラウザでindex.htmlを開く
open index.html
```

## 🤝 コントリビューション

改善のアイデアやバグ報告は歓迎です！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ⚠️ 注意事項

- このツールは**教育目的**で作成されています
- **実際のパスワードは入力しないでください**
- セキュリティ研究以外での悪用は禁止

## 📄 ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照

## 🌟 作者

**[tamaden55](https://github.com/tamaden55)**

---

### 🔗 関連リンク

- **ライブデモ**: https://tamaden55.github.io/Password-Strength-Simulator/
- **リポジトリ**: https://github.com/tamaden55/Password-Strength-Simulator
- **Issues**: バグ報告・機能要望はこちら

---

**⭐ このプロジェクトが役に立ったら、ぜひスターをお願いします！**