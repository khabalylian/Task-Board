import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hook';
import styles from './InfoTask.module.css';
import Modal from 'react-modal';
import { IHistoryGet, IListCard } from '../../slice/interfaceSlice';
import { getHistoryCard } from '../../slice/TodoHistory';

interface ITaskInfo {
  id: number;
  isOpen: boolean;
  card: IListCard;
  name: string;
  handleOpenInfo: () => void;
  handleCloseInfo: () => void;
}

const InfoTask: React.FC<ITaskInfo> = ({
  card,
  name,
  isOpen,
  handleCloseInfo,
  handleOpenInfo,
  id,
}) => {
  const [historyValue, setHistoryValue] = useState<IHistoryGet[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHistoryCard({ id })).then((data) => {
      if (data.payload) setHistoryValue(data.payload as IHistoryGet[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      className={styles.infoTask}
      isOpen={isOpen}
      onAfterOpen={handleOpenInfo}
      onRequestClose={handleCloseInfo}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <button className={styles.btn} onClick={handleCloseInfo}>
            ⛌
          </button>
        </div>
        <div className={styles.wrapperContent}>
          <div className={styles.information}>
            <h2 className={styles.title}>{card.title}</h2>
            <div className={styles.box}>
              <div className={styles.boxItem}>
                <span>Status</span>
                {name}
              </div>
              <div className={styles.boxItem}>
                <span>Due date</span>
                {card.time}
              </div>
              <div className={styles.boxItem}>
                <span>Priority</span>
                {card.priority}
              </div>
            </div>
            <h2 className={styles.titleDescr}>Description</h2>
            <p className={styles.description}>{card.description}</p>
          </div>
          <div className={styles.history}>
            {historyValue.flat().map((history) => (
              <div key={history.id} className={styles.historyCard}>
                <div className={styles.text}>
                  <span className={styles.dot}></span>
                  <div
                    className={styles.mainText}
                  >
                    {history.text}
                  </div>
                </div>
                <p className={styles.time}>{history.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoTask;
