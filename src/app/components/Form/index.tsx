import React from 'react';
import Header from './components/Header';

import styles from './styles.module.scss';

const Form: React.FC = () => {
  return (
    <div className={styles.main}>
      <Header />

      {/* Client data */}
      <div className={styles.client_data}>
        <div className={styles.form_row}>
          <div className={styles.form_item}>
            <label htmlFor="client-name">
              <strong>Dr(a)</strong>
              <input type="text" id="client-name" />
            </label>
          </div>
          <div className={styles.form_item}>
            <label htmlFor="client-name">
              <strong>Dr(a)</strong>
              <input type="text" id="client-name" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
