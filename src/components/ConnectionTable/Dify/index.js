import React, { useState } from 'react';
import './dify.css';

const DifyModal = ({ isOpen, onClose, connection }) => {
  const [difyApiKey, setDifyApiKey] = useState('');
  const [openAIApiKey, setOpenAIApiKey] = useState('');
  const [domain, setDomain] = useState('api.dify.ai');
  const [tag, setTag] = useState('');
  const [viewMessages, setViewMessages] = useState(false);
  const [breakText, setBreakText] = useState(false);
  const [audioReply, setAudioReply] = useState('never');
  const [followUpAI, setFollowUpAI] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="dify-modal-container">
      <div className="dify-modal-backdrop" onClick={onClose}></div>
      <div className="dify-modal" onClick={e => e.stopPropagation()}>
        <div className="dify-modal-header">
          <h2>Conexão Dify <span className="dify-help" title="Configuração Dify">?</span></h2>
          <button className="dify-close" onClick={onClose}>×</button>
        </div>
        <div className="dify-modal-body">
          <div className="dify-field-group">
            <label>Nome</label>
            <input type="text" value={connection?.name || ''} readOnly />
          </div>
          <div className="dify-field-group">
            <label>Apikey do Dify</label>
            <input type="text" value={difyApiKey} onChange={e => setDifyApiKey(e.target.value)} placeholder="apikey" />
          </div>
          <div className="dify-field-group">
            <label>Apikey da OpenAI <span className="dify-help" title="Chave da OpenAI">?</span></label>
            <input type="text" value={openAIApiKey} onChange={e => setOpenAIApiKey(e.target.value)} placeholder="apikey" />
          </div>
          <div className="dify-field-group">
            <label>Domínio Base</label>
            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="api.dify.ai" />
          </div>
          <div className="dify-field-group">
            <label>Tag do Tráfego Pago <span className="dify-help" title="Nome da Tag no WhatsApp Business (Opcional)">?</span></label>
            <input type="text" value={tag} onChange={e => setTag(e.target.value)} placeholder="Nome da Tag no WhatsApp Business (Opcional)" />
          </div>
          <div className="dify-radio-group">
            <label>Visualizar Mensagens?</label>
            <div>
              <label><input type="radio" checked={viewMessages} onChange={() => setViewMessages(true)} /> Sim</label>
              <label><input type="radio" checked={!viewMessages} onChange={() => setViewMessages(false)} /> Não</label>
            </div>
          </div>
          <div className="dify-radio-group">
            <label>Quebrar texto em várias mensagens?</label>
            <div>
              <label><input type="radio" checked={breakText} onChange={() => setBreakText(true)} /> Sim</label>
              <label><input type="radio" checked={!breakText} onChange={() => setBreakText(false)} /> Não</label>
            </div>
          </div>
          <div className="dify-radio-group">
            <label>Responder com áudio?</label>
            <div>
              <label><input type="radio" checked={audioReply === 'never'} onChange={() => setAudioReply('never')} /> Nunca</label>
              <label><input type="radio" checked={audioReply === 'whenAudio'} onChange={() => setAudioReply('whenAudio')} /> Apenas quando receber áudios</label>
              <label><input type="radio" checked={audioReply === 'always'} onChange={() => setAudioReply('always')} /> Sempre</label>
            </div>
          </div>
          <div className="dify-radio-group">
            <label>Follow Up com IA?</label>
            <div>
              <label><input type="radio" checked={followUpAI} onChange={() => setFollowUpAI(true)} /> Sim</label>
              <label><input type="radio" checked={!followUpAI} onChange={() => setFollowUpAI(false)} /> Não</label>
            </div>
          </div>
        </div>
        <div className="dify-modal-footer">
          <button className="dify-cancel" onClick={onClose}>Cancelar</button>
          <button className="dify-confirm">Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default DifyModal;
