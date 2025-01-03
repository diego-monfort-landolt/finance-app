import React, { useState } from 'react';

interface Wish {
  id: number;
  description: string;
  amount: number;
  fulfilled: boolean;
  debt: boolean;
}

interface WishlistProps {
  balance: number;
}

const Wishlist: React.FC<WishlistProps> = ({ balance }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const addWish = () => {
    if (description && amount !== undefined && amount > 0) {
      const newWish = { id: Date.now(), description, amount, fulfilled: false, debt: false };
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
          return { ...wish, fulfilled: true, debt: false };
        } else {
          return { ...wish, fulfilled: true, debt: true };
        }
      }
      return wish;
    }));
  };

  return (
    <div>
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
          <li key={wish.id}>
            <span>{wish.description} - {wish.amount} €</span>
            {wish.fulfilled ? (
              <span> (Erfüllt{wish.debt ? ' mit Schulden' : ''})</span>
            ) : (
              balance >= wish.amount && (
                <button onClick={() => fulfillWish(wish.id)}>Erfüllen</button>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;