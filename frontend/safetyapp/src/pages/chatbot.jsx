import React, { useState } from 'react';
import { Card, Spin, Tag, Typography, List, Avatar, Button, Badge, notification } from 'antd';
import { HumanMessage } from "@langchain/core/messages"; 
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PoweroffOutlined, MessageOutlined } from '@ant-design/icons';
import StressCoach from '../assets/W.E.L.L.png';
import { generateStressPrompt } from './Promptor';

const chatbotStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  padding: '10px',
  borderRadius: '8px',
  zIndex: 1000,
  width: '300px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const chatContainerStyles = {
  position: 'fixed',
  bottom: '70px',
  right: '20px',
  width: '400px',
  height: '300px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '8px',
  overflowY: 'auto',
  padding: '20px',
  display: 'none',
  zIndex: 1000,
};

const { Title, Text } = Typography;

const Chatbot = ({ stressScore, responses }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [suggestionsLoaded, setSuggestionsLoaded] = useState(false); 

  const fetchSuggestions = async () => {
    setLoading(true);
    setErrorMessage(null);
    setShowNotification(false);

    try {
      const vision = new ChatGoogleGenerativeAI({
        modelName: "gemini-1.5-pro", 
        apiKey: 'AIzaSyABMmVzBkK-blSr9GfisbucUqYL9NIIszA',
      });

      const prompt = generateStressPrompt(responses); ;
      const contents = [new HumanMessage({ content: prompt })];
      
      const response = await vision.call(contents);
      setSuggestions(response.content);
      setSuggestionsLoaded(true); 

      notification.success({
        message: 'AI Suggestions Loaded',
        description: 'AI suggestions to relieve stress have been loaded successfully.',
      });
    } catch (error) {
      console.log(error)
      setErrorMessage("Can't get suggestions now. Please try again later.");
      notification.error({
        message: 'Error',
        description: 'Unable to retrieve suggestions at the moment.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          ...chatbotStyles, 
          transform: isOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
        onClick={() => setIsOpen(true)}
      >
        <Avatar src={StressCoach} style={{ marginRight: '10px' }} />
        <span style={{ color: 'black' }}>StressCoach</span>
        {showNotification && (
          <Badge 
            count={1} 
            style={{
              backgroundColor: '##0f2027',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
            }}
          />
        )}
      </div>

      <div style={{ ...chatContainerStyles, display: isOpen ? 'block' : 'none' }}>
        <Button 
          onClick={() => setIsOpen(false)} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            borderColor: '##0f2027',
          }}
          icon={<PoweroffOutlined />}
        />

        <Title level={4} style={{ color: '##0f2027', textAlign: 'center' }}>AI Suggestions</Title>
 
        <Card loading={loading} style={{ maxWidth: '100%' }}>
  {loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <Spin size="large" tip="Getting AI suggestions..." />
    </div>
  ) : (
    <div>
      {suggestions && suggestions.split('\n').map((line, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          {line}
        </div>
      ))}
    </div>
  )}
  {errorMessage && (
    <Text type="danger" style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}>
      {errorMessage}
    </Text>
  )}
</Card>

        
        {!loading && !errorMessage && !suggestionsLoaded && ( 
          <Button
            type="primary"
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={fetchSuggestions}
          >
            Get Suggestions <MessageOutlined />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;

