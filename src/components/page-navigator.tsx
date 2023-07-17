import styles from './page-navigator.module.scss';

export default function PageNavigator({pageNum, numPages}: {pageNum: number, numPages: number}) {
  const prevPageNum = pageNum - 1;
  const nextPageNum = pageNum + 1;

  return (
    <div className={styles.pageNavContainer}>
        {/* 
        If user is on first page, replace the previous page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {prevPageNum > 0 ? <a className={styles.arrow} href={prevPageNum == 1 ? `../` : `../${prevPageNum}`}><button>&lt;</button></a> : <div></div>}

        <p className={styles.pageNumber}>Page {pageNum}</p>

        {/* 
        If user is on last page, replace the next page 
        button with an empty div so that flexbox correctly
        spaces out elements correctly.
        */}
        {nextPageNum <= numPages ? <a className={styles.arrow} href={pageNum == 1 ? `./${nextPageNum}` : `../${nextPageNum}`}><button>&gt;</button></a> : <div></div>}


      </div>
  );
}