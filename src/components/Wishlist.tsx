import React, { useState } from 'react';

interface Wish {
  id: number;
  description: string;
  amount: number;
  fulfilled: boolean;
}
interface WishlistProps {
  balance: number;
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
}
const Wishlist: React.FC<WishlistProps> = ({ balance, wishes, setWishes }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const addWish = () => {
    if (description && amount !== undefined && amount > 0) {
      const newWish = { id: Date.now(), description, amount, fulfilled: false };
      setWishes([...wishes, newWish]);
      setDescription('');
      setAmount(undefined);
    } else {
      alert('Bitte füllen Sie alle Felder aus.');
    }
  };

  const fulfillWish = (id: number) => {
    setWishes(wishes.map(wish => {
      if (wish.id === id) {
        if (balance >= wish.amount) {
          return { ...wish, fulfilled: true };
        } else {
          alert('Nicht genügend Guthaben, um diesen Wunsch zu erfüllen.');
        }
      }
      return wish;
    }));
  };

  return (
    <div className="wishlist">
      <h2>Wunschliste</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Betrag"
          value={amount !== undefined ? amount : ''}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={addWish}>Wunsch hinzufügen</button>
      </div>
      <ul>
        {wishes.map(wish => (
          <li key={wish.id} className={wish.fulfilled ? 'fulfilled' : ''}>
            <span>{wish.description} - {wish.amount} €</span>
            {!wish.fulfilled && (
              <button onClick={() => fulfillWish(wish.id)}>Erfüllen</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Wishlist;