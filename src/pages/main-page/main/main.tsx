import { Layout } from 'antd';
import styles from './main.module.css';

const { Content } = Layout;

export const Main = () => {
    return <Content className={styles.Main}></Content>;
};
