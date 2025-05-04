import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Twitter,
    Instagram,
    Twitch,
    Youtube,
    Trophy,
    Users,
    ShoppingCart,
    Mail,
    Send,
    Gamepad2,
} from 'lucide-react';
import ChatBot from './ChatBot';
import './App.css';


import furiaVct from './assets/furiavct.jpg';

import arTImage from './assets/csgo/arT.png';
import dropImage from './assets/csgo/drop.png';
import fallenImage from './assets/csgo/FalleN.jpg';
import ksceratoImage from './assets/csgo/KSCERATO.png';
import yuurihImage from './assets/csgo/yuurih.png';
import campeaoEslProLeagueImage from './assets/csgo/Campeão_da_ESL_Pro_League.png'; 
import dreamhack from './assets/csgo/dreamhack.png';

import dgzinImage from './assets/valorant/dgzin.png';
import khalilImage from './assets/valorant/Khalil.png';
import liazziImage from './assets/valorant/liazzi.png';
import mwzeraImage from './assets/valorant/mwzera.png';
import quickImage from './assets/valorant/Quick.png';
import furiaVtcAmericanas from './assets/valorant/FURIA-VCT-AMERICAS.png'

import caard from './assets/rocketleague/caard.jpg';
import Lostt from './assets/rocketleague/Lostt.jpg';
import Yanxnz from './assets/rocketleague/Yanxnz.jpg';
import top4rocket from './assets/rocketleague/top4rocket.jpg';

const furiaData = {
    nome: 'FURIA',
    slogan: 'A Garra que Conquistou o Mundo',
    descricao:
        'A FURIA é uma organização brasileira de e-sports que se destaca pela paixão, garra e excelência em diversas modalidades. Nossa missão é inspirar e conectar fãs ao redor do mundo, celebrando a cultura gamer e buscando constantemente a vitória.',
    times: [
        {
            nome: 'CS:GO',
            jogadores: [
                { nome: 'arT', imagem: arTImage },
                { nome: 'yuurih', imagem: yuurihImage },
                { nome: 'KSCERATO', imagem: ksceratoImage },
                { nome: 'drop', imagem: dropImage },
                { nome: 'FalleN', imagem: fallenImage },
            ],
            titulos: ['Campeão da ESL Pro League', 'Campeão da DreamHack Open'],
            imagem: campeaoEslProLeagueImage, 
        },
        {
            nome: 'VALORANT',
            jogadores: [
                { nome: 'mwzera', imagem: mwzeraImage },
                { nome: 'Quick', imagem: quickImage },
                { nome: 'Khalil', imagem: khalilImage },
                { nome: 'dgzin', imagem: dgzinImage },
                { nome: 'liazzi', imagem: liazziImage },
            ],
            titulos: ['Campeão do VCT Brasil', 'Vice-campeão do Masters Reykjavík'],
            imagem: furiaVtcAmericanas, 
        },
        {
            nome: 'Rocket League',
            jogadores: [
                { nome: 'caard', imagem:  caard || 'https://via.placeholder.com/150' },
                { nome: 'Lostt', imagem: Lostt || 'https://via.placeholder.com/150' },
                { nome: 'Yanxnz', imagem: Yanxnz || 'https://via.placeholder.com/150' },
            ],
            titulos: ['Campeão Regional #1', 'Top 4 Major'],
            imagem: top4rocket, 
        },
    ],
    conquistas: [
        { titulo: 'ESL Pro League', ano: 2020, imagem: campeaoEslProLeagueImage || 'https://via.placeholder.com/100' },
        { titulo: 'DreamHack Open', ano: 2019, imagem: dreamhack || 'https://via.placeholder.com/100' },
        { titulo: 'VCT Brasil', ano: 2021, imagem: furiaVtcAmericanas || 'https://via.placeholder.com/100' },
        { titulo: 'RLCS Regional', ano: 2023, imagem: top4rocket || 'https://via.placeholder.com/100' },
    ],
    redesSociais: [
        { nome: 'Twitter', url: 'https://twitter.com/FURIA', icon: <Twitter className="lucide-icon" /> },
        { nome: 'Instagram', url: 'https://instagram.com/furiagg', icon: <Instagram className="lucide-icon" /> },
        { nome: 'Twitch', url: 'https://twitch.tv/furiatv', icon: <Twitch className="lucide-icon" /> },
        // { nome: 'YouTube', url: 'https://youtube.com/furiatv', icon: <Youtube className="lucide-icon" /> },
    ],
    lojaUrl: 'https://www.furia.gg/',
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, 
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideIn = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const HeroSection = () => (
    <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-section"
    >
        <div className="container">
            <motion.h1
                variants={itemVariants}
                className="hero-title"
            >
                {furiaData.nome}
            </motion.h1>
            <motion.p
                variants={itemVariants}
                className="hero-slogan"
            >
                {furiaData.slogan}
            </motion.p>
        </div>
     
        <div className="hero-background-gradient" />
        <div className="hero-gamepad-icon">
            <Gamepad2 className="gamepad-icon" />
        </div>
    </motion.section>
);

const AboutUs = () => (
    <motion.section
        id="sobre"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="about-us-section"
    >
        <div className="container">
            <div className="about-us-grid">
                <div>
                    <h2 className="section-title">
                        Nossa História
                    </h2>
                    <p className="about-us-description">
                        {furiaData.descricao}
                    </p>
                </div>
                <div className="about-us-image-container">
                    <img
                        src={furiaVct || "https://via.placeholder.com/600x400"} 
                        alt="Sobre a FURIA"
                        className="about-us-image"
                    />
                    <div className="about-us-image-overlay" />
                </div>
            </div>
        </div>
    </motion.section>
);

const OurTeams = () => (
    <motion.section
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="our-teams-section"
    >
        <div className="container">
            <h2 className="section-title text-center">
                Nossos Esquadrões
            </h2>
            <div className="our-teams-list">
                {furiaData.times.map((time, index) => (
                    <div
                        key={time.nome}
                        className={`team-item ${index % 2 === 0 ? 'even' : 'odd'}`}
                    >
                        <div>
                            <h3 className="team-name">{time.nome}</h3>
                            <p className="team-players-title">
                                <strong>Jogadores:</strong>
                            </p>
                            <div className="team-players-grid">
                                {time.jogadores.map((jogador) => (
                                    <div
                                        key={jogador.nome}
                                        className="player-card"
                                    >
                                        <img
                                            src={jogador.imagem}
                                            alt={jogador.nome}
                                            className="player-image"
                                        />
                                        <span className="player-name">{jogador.nome}</span>
                                    </div>
                                ))}
                            </div>
                            {time.titulos.length > 0 && (
                                <>
                                    <p className="team-titles-title">
                                        <strong>Títulos:</strong>
                                    </p>
                                    <ul className="team-titles-list">
                                        {time.titulos.map((titulo) => (
                                            <li key={titulo} className="team-title-item">
                                                {titulo}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="team-image-container">
                            <img
                                src={time.imagem}
                                alt={time.nome}
                                className="team-image"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.section>
);

const Achievements = () => (
    <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="achievements-section"
    >
        <div className="container">
            <h2 className="section-title text-center">
                Nossas Conquistas
            </h2>
            <div className="achievements-grid">
                {furiaData.conquistas.map((conquista) => (
                    <div
                        key={conquista.titulo}
                        className="achievement-card"
                    >
                        <img
                            src={conquista.imagem}
                            alt={conquista.titulo}
                            className="achievement-image"
                        />
                        <h3 className="achievement-title">
                            {conquista.titulo}
                        </h3>
                        <p className="achievement-year">{conquista.ano}</p>
                    </div>
                ))}
            </div>
        </div>
    </motion.section>
);

const Community = () => (
    <motion.section
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="community-section"
    >
        <div className="container">
            <div className="community-header">
                <h2 className="section-title text-center">
                    A Nação FURIOSA
                </h2>
                <p className="community-description text-center">
                    Junte-se à maior e mais apaixonada torcida do mundo dos e-sports!
                    Siga-nos nas redes sociais e faça parte da nossa comunidade.
                </p>
            </div>
            <div className="social-links">
                {furiaData.redesSociais.map((redeSocial) => (
                    <a
                        key={redeSocial.nome}
                        href={redeSocial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label={redeSocial.nome}
                    >
                        {redeSocial.icon}
                    </a>
                ))}
            </div>
            <div className="community-cta">
                <button className="community-button">
                    <a href={furiaData.lojaUrl} target="_blank" rel="noopener noreferrer">
                        Visite nossa loja oficial
                    </a>
                </button>
            </div>
        </div>
    </motion.section>
);

const ContactUs = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); 
            setSubmitSuccess(true);
            setFormData({ nome: '', email: '', mensagem: '' }); 
        } catch (error) {
            setSubmitError(error.message || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="contact-us-section"
        >
            <div className="container">
                <h2 className="section-title text-center">
                    Fale Conosco
                </h2>
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="nome" className="form-label">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                                placeholder="Seu Nome"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="seuemail@exemplo.com"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensagem" className="form-label">
                                Mensagem
                            </label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                value={formData.mensagem}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Sua mensagem..."
                                className="form-textarea"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit-button"
                        >
                            {isSubmitting ? (
                                <>Enviando...</>
                            ) : (
                                <>
                                    Enviar Mensagem
                                </>
                            )}
                        </button>
                        {submitError && (
                            <p className="form-error">{submitError}</p>
                        )}
                        {submitSuccess && (
                            <p className="form-success">
                                Sua mensagem foi enviada com sucesso!
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </motion.section>
    );
};

const Footer = () => (
    <footer className="main-footer">
        <div className="container">
            <div className="footer-social-links">
                {furiaData.redesSociais.map((redeSocial) => (
                    <a
                        key={redeSocial.nome}
                        href={redeSocial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-social-icon"
                        aria-label={redeSocial.nome}
                    >
                        {redeSocial.icon}
                    </a>
                ))}
            </div>
            <p className="footer-copyright">
                © {new Date().getFullYear()} {furiaData.nome}. Todos os direitos reservados.
            </p>
            <p className="footer-developer">
                Desenvolvido por{' '}
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="developer-link"
                >
                    Gustavo de Assis #FURIA
                </a>
            </p>
        </div>
    </footer>
);

const App = () => {
    return (
        <div className="app-container">
            <HeroSection />
            <AboutUs />
            <OurTeams />
            <Achievements />
            <Community />
            <ContactUs />
            <ChatBot />
            <Footer />
        </div>
    );
};

export default App; 