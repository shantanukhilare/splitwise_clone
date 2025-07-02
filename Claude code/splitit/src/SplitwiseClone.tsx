import React, { useState } from 'react';

// Define TypeScript interfaces
interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  splitEvenly: boolean;
  splitAmount: number;
  date: string;
}

interface ExpenseFormState {
  description: string;
  amount: string;
  paidBy: string;
  splitWith: string[];
  splitEvenly: boolean;
}

interface Balance {
  [person: string]: {
    [otherPerson: string]: number;
  };
}

interface Debt {
  from: string;
  to: string;
  amount: string;
}

const SplitwiseClone: React.FC = () => {
  const [friends, setFriends] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newFriend, setNewFriend] = useState<string>('');
  const [expenseForm, setExpenseForm] = useState<ExpenseFormState>({
    description: '',
    amount: '',
    paidBy: '',
    splitWith: [],
    splitEvenly: true,
  });
  const [activeTab, setActiveTab] = useState<'expenses' | 'friends' | 'balances'>('expenses');

  // Add a new friend
  const addFriend = (): void => {
    if (newFriend.trim() && !friends.includes(newFriend.trim())) {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend('');
    }
  };

  // Handle expense form changes
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name === 'splitEvenly') {
      setExpenseForm(prev => ({
        ...prev,
        splitEvenly: checked
      }));
    } else if (name === 'splitWith') {
      const friendName = value;
      const isChecked = (e.target as HTMLInputElement).checked;
      
      setExpenseForm(prev => {
        if (isChecked) {
          return {
            ...prev,
            splitWith: [...prev.splitWith, friendName]
          };
        } else {
          return {
            ...prev,
            splitWith: prev.splitWith.filter(name => name !== friendName)
          };
        }
      });
    } else {
      setExpenseForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Add a new expense
  const addExpense = (): void => {
    const { description, amount, paidBy, splitWith, splitEvenly } = expenseForm;
    
    if (description && amount && paidBy && splitWith.length > 0) {
      const amountValue = parseFloat(amount);
      const splitAmount = splitEvenly 
        ? amountValue / (splitWith.length + 1) // +1 for the payer
        : 0; // In a real app, you'd handle custom split amounts
      
      const newExpense: Expense = {
        id: expenses.length + 1,
        description,
        amount: amountValue,
        paidBy,
        splitWith,
        splitEvenly,
        splitAmount,
        date: new Date().toLocaleDateString()
      };
      
      setExpenses([...expenses, newExpense]);
      
      // Reset form
      setExpenseForm({
        description: '',
        amount: '',
        paidBy: '',
        splitWith: [],
        splitEvenly: true,
      });
    }
  };

  // Calculate balances between friends
  const calculateBalances = (): Balance => {
    const balances: Balance = {};
    
    // Initialize balances for all friends
    friends.forEach(friend => {
      balances[friend] = {};
      friends.forEach(otherFriend => {
        if (friend !== otherFriend) {
          balances[friend][otherFriend] = 0;
        }
      });
    });
    
    // Calculate balances based on expenses
    expenses.forEach(expense => {
      const { paidBy, splitWith, amount, splitEvenly } = expense;
      
      if (splitEvenly) {
        const splitAmount = amount / (splitWith.length + 1);
        
        // Update balances for each person who owes the payer
        splitWith.forEach(debtor => {
          if (debtor !== paidBy) {
            balances[debtor][paidBy] = (balances[debtor][paidBy] || 0) - splitAmount;
            balances[paidBy][debtor] = (balances[paidBy][debtor] || 0) + splitAmount;
          }
        });
      }
    });
    
    // Simplify balances (e.g., if A owes B $5 and B owes A $3, A just owes B $2)
    friends.forEach(friend => {
      friends.forEach(otherFriend => {
        if (friend !== otherFriend) {
          const balance = balances[friend][otherFriend] || 0;
          const reverseBalance = balances[otherFriend][friend] || 0;
          
          if (balance > 0 && reverseBalance > 0) {
            if (balance > reverseBalance) {
              balances[friend][otherFriend] = balance - reverseBalance;
              balances[otherFriend][friend] = 0;
            } else {
              balances[otherFriend][friend] = reverseBalance - balance;
              balances[friend][otherFriend] = 0;
            }
          }
        }
      });
    });
    
    return balances;
  };

  // Get a simplified list of who owes whom
  const getSimplifiedDebts = (): Debt[] => {
    const balances = calculateBalances();
    const debts: Debt[] = [];
    
    friends.forEach(friend => {
      friends.forEach(otherFriend => {
        if (friend !== otherFriend && (balances[friend][otherFriend] || 0) > 0) {
          debts.push({
            from: otherFriend,
            to: friend,
            amount: balances[friend][otherFriend].toFixed(2)
          });
        }
      });
    });
    
    return debts;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">SplitEasy</h1>
      
      {/* Navigation Tabs */}
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'expenses' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          Expenses
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'friends' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'balances' ? 'bg-blue-100 border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('balances')}
        >
          Balances
        </button>
      </div>
      
      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add Friends</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newFriend}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFriend(e.target.value)}
              placeholder="Friend's name"
              className="flex-1 p-2 border rounded"
            />
            <button 
              onClick={addFriend}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          
          <h3 className="font-medium mb-2">Your Friends:</h3>
          {friends.length > 0 ? (
            <ul className="list-disc pl-5">
              {friends.map((friend, index) => (
                <li key={index} className="mb-1">{friend}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No friends added yet</p>
          )}
        </div>
      )}
      
      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
          
          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <input
              type="text"
              name="description"
              value={expenseForm.description}
              onChange={handleExpenseChange}
              placeholder="e.g., Dinner, Rent, Groceries"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Amount:</label>
            <input
              type="number"
              name="amount"
              value={expenseForm.amount}
              onChange={handleExpenseChange}
              placeholder="0.00"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Paid by:</label>
            <select
              name="paidBy"
              value={expenseForm.paidBy}
              onChange={handleExpenseChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select who paid</option>
              <option value="You">You</option>
              {friends.map((friend, index) => (
                <option key={index} value={friend}>{friend}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">Split with:</label>
            <div className="pl-4">
              <div className="mb-2">
                <input
                  type="checkbox"
                  id="you-checkbox"
                  name="splitWith"
                  value="You"
                  checked={expenseForm.splitWith.includes('You')}
                  onChange={handleExpenseChange}
                  className="mr-2"
                />
                <label htmlFor="you-checkbox">You</label>
              </div>
              {friends.map((friend, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="checkbox"
                    id={`friend-${index}`}
                    name="splitWith"
                    value={friend}
                    checked={expenseForm.splitWith.includes(friend)}
                    onChange={handleExpenseChange}
                    className="mr-2"
                  />
                  <label htmlFor={`friend-${index}`}>{friend}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="splitEvenly"
                checked={expenseForm.splitEvenly}
                onChange={handleExpenseChange}
                className="mr-2"
              />
              Split evenly
            </label>
          </div>
          
          <button
            onClick={addExpense}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Expense
          </button>
          
          <h3 className="font-medium my-4">Recent Expenses:</h3>
          {expenses.length > 0 ? (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-3 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-600">{expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${expense.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Paid by {expense.paidBy}</p>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Split {expense.splitEvenly ? 'evenly' : 'custom'} with {expense.splitWith.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No expenses added yet</p>
          )}
        </div>
      )}
      
      {/* Balances Tab */}
      {activeTab === 'balances' && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Balances</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Summary:</h3>
            
            {getSimplifiedDebts().length > 0 ? (
              <div className="space-y-2">
                {getSimplifiedDebts().map((debt, index) => (
                  <div key={index} className="p-2 border-l-4 border-blue-500 bg-blue-50">
                    <p>{debt.from} owes {debt.to} ${debt.amount}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">All settled up! No balances to show.</p>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Expense Total:</h3>
            <p className="text-lg">
              ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitwiseClone;