import TodoList from '../../components/TodoList/TodoList';
import styles from './Main.module.css';

const Main: React.FC = () => {
	return (
		<main className={styles.main}>
			<TodoList />
		</main>
	);
};

export default Main;
