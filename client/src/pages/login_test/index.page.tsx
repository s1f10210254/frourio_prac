import React, { useState } from 'react';
import { registerWithEmail } from 'src/utils/login';
// import { registerWithEmail } // ここで先ほど作成した登録関数をインポート

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      await registerWithEmail(email, password);
      setMessage('登録に成功しました');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`登録に失敗しました: ${error.message}`);
      } else {
        // error が Error インスタンスではない場合の処理
        setMessage('登録に失敗しました: 不明なエラーが発生しました');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">メールアドレス:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">パスワード:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">登録</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
