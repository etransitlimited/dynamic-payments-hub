
import React, { useEffect, useState } from 'react';
import { cardApi } from '@/modules/card/api/cardApi';
import { useToast } from '@/hooks/use-toast';

// 卡片数据接口
interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  issueDate: string;
  status: string;
  balance: number;
}

const CardListExample: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // 使用cardApi服务调用LIST接口的GET方法
        const response = await cardApi.LISTGet<{records: Card[]}>({
          pageSize: 10,
          pageNum: 1
        });
        
        setCards(response.records || []);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
        toast({
          title: '获取卡片失败',
          description: '无法加载卡片数据，请稍后再试',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, [toast]);
  
  return (
    <div className="card_list_3a4f">
      {/* 示例组件内容 */}
      <h2>卡片列表</h2>
      {loading ? (
        <p>加载中...</p>
      ) : cards.length > 0 ? (
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              {card.cardNumber} - {card.cardHolder} (余额: {card.balance})
            </li>
          ))}
        </ul>
      ) : (
        <p>暂无卡片数据</p>
      )}
    </div>
  );
};

export default CardListExample;
