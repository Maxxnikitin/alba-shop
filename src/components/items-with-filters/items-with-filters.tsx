import clsx from 'clsx';
import { useStore } from 'effector-react';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import styles from './items-with-filters.module.scss';

import { IItemsWithFiltersProps } from './types';

import { Item, QueryNotFound } from '..';
import { Filters } from '../filters';
import { FilterPopupButton, Modal, Pagination, SortSelect, Title } from '../ui';

import {
  getCatalogItemsFx,
  removeFilterItems,
  removeFilters,
  updateCatalogItemsBtnFx,
} from 'src/models';
import { $catalogItemsStore, removeCatalogItems } from 'src/models/get-catalog-items';
import { TSortingItems } from '~utils';

export const ItemsWithFilters: FC<IItemsWithFiltersProps> = memo(
  ({ title, className = '', ...rest }) => {
    const [currSort, setCurrSort] = useState<TSortingItems>('-is_hit');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [prevTop, setPrevTop] = useState<number | null>(null);
    // true - это фиксация с помощью relative относительно товаров. false - это sticky
    const [isFixed, setIsFixed] = useState(false);

    const { data } = useStore($catalogItemsStore);

    const { id } = useParams();

    const contentRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);

    const categoryId = useMemo(() => id?.split('_')[0], [id]);

    const handleSortingChange: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
      setCurrSort(e.target.value as TSortingItems);
    }, []);

    const handleToggleFilters = useCallback(() => setIsFiltersOpen(prev => !prev), []);

    useEffect(() => {
      if (categoryId) {
        getCatalogItemsFx({
          id: categoryId,
          queries: [`sort=${currSort}`],
        });
      }
    }, [currSort, categoryId]);

    useEffect(
      () => () => {
        removeCatalogItems();
        removeFilterItems();
        removeFilters({ min: 0, max: 0 });
      },
      [],
    );

    useEffect(() => {
      const handleScroll = () => {
        const filtersRect = filtersRef.current?.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();

        // здесь храним предыдущую высоту, чтобы понимать, скроллим мы в данный момент вверх или вниз
        if (prevTop) {
          // если вверх
          if ((contentRect?.top || 0) > prevTop) {
            if (
              // если мы ещё не дошли до самого верха фильтров и не прилипили их к верху
              !(
                filtersRef.current?.style.position === 'sticky' &&
                filtersRef.current?.style.top === '20px'
              )
            ) {
              // если ещё не зафиксировали до этого (относительно контента)
              if (!isFixed) {
                // выставляем относительное позиционирование и позволяем скроллить фильтры вместе с контентом
                filtersRef.current?.style.setProperty('position', 'relative');
                filtersRef.current?.style.setProperty('align-self', 'flex-start');
                filtersRef.current?.style.setProperty('bottom', 'auto');

                // высчитываем высоту, на которой нужно зафиксировать фильтры
                const top =
                  (filtersRect?.height || 0) - window.innerHeight + (contentRect?.top || 0) + 20;

                filtersRef.current?.style.setProperty(
                  'top',
                  `${
                    // если больше нуля, значит мы ещё находимся внутри контента и выставляем текущую высоту
                    (contentRect?.height || 0) - (filtersRect?.height || 0) + top > 0
                      ? Math.abs(top)
                      : // если меньше, то скролл уже ниже высоты контента и выставляем так, чтобы зафиксить внизу блока
                        (contentRect?.height || 0) - (filtersRect?.height || 0)
                  }px`,
                );
                // если не зафиксировать, то при каждом скролле будет перерасчёт и блок будет сдвигаться
                setIsFixed(true);
              }
            }

            // значит верх фильтров наверху экрана и пора прилеплять
            if ((filtersRect?.top || 0) - 20 > 0) {
              filtersRef.current?.style.setProperty('position', 'sticky');
              filtersRef.current?.style.setProperty('top', '20px');
              filtersRef.current?.style.setProperty('bottom', 'auto');
              filtersRef.current?.style.setProperty('align-self', 'flex-start');
              // снимаем отметку о фиксировании
              setIsFixed(false);
            }
            // если вниз
          } else {
            // если ещё не дошли до низа фильтров и не прилипили их к низу
            if (
              !(
                filtersRef.current?.style.position === 'sticky' &&
                filtersRef.current?.style.bottom === '20px'
              )
            ) {
              // если ещё не зафиксировали до этого (относительно контента)
              if (!isFixed) {
                // выставляем относительное позиционирование и позволяем скроллить фильтры вместе с контентом
                filtersRef.current?.style.setProperty('position', 'relative');
                filtersRef.current?.style.setProperty('align-self', 'flex-start');
                filtersRef.current?.style.setProperty('bottom', 'auto');

                // высчитываем высоту, на которой нужно зафиксировать фильтры
                const top = (contentRect?.top || 0) - 20;
                // если больше нуля, значит скролл ещё слишком высоко и мы не дошли до начала блока
                filtersRef.current?.style.setProperty('top', `${top < 0 ? Math.abs(top) : 0}px`);
                // если не зафиксировать, то при каждом скролле будет перерасчёт и блок будет сдвигаться
                setIsFixed(true);
              }
            }

            // значит низ фильтров внизу экрана и пора прилеплять
            if ((filtersRect?.bottom || 0) + 20 < window.innerHeight) {
              filtersRef.current?.style.setProperty('position', 'sticky');
              filtersRef.current?.style.setProperty('bottom', '20px');
              filtersRef.current?.style.setProperty('align-self', 'flex-end');
              filtersRef.current?.style.setProperty('top', 'auto');
              // снимаем отметку о фиксировании
              setIsFixed(false);
            }
          }
        }
        setPrevTop(contentRect?.top || 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevTop, isFixed]);

    if (!data) return null;

    if (!data?.data?.length) return <QueryNotFound />;

    return (
      <div className={clsx(styles.container, className)} {...rest}>
        <div className={styles.title_box}>
          <Title className={styles.title}>{title}</Title>
          {/* <Paragraph className={styles.title_box_text}>{`${12} ${t('items.title-from')} ${2412} ${t(
            `filters.items_word.${getWordForm(12)}`,
          )}`}</Paragraph> */}
        </div>

        <div className={styles.columns}>
          {window.innerWidth > 970 && (
            <aside className={styles.filters_box}>
              <div ref={filtersRef} className={styles.filters_sticky}>
                <Filters
                  className={styles.filters}
                  filters={data?.meta.filters}
                  categoryId={categoryId}
                  currSort={currSort}
                  totalItems={data?.meta.pagination.total_items}
                  isDesktop
                />
              </div>
            </aside>
          )}
          <div className={styles.main_content} ref={contentRef}>
            <div className={styles.sort_filters_box}>
              <SortSelect
                value={currSort}
                onChange={handleSortingChange}
                className={styles.sort_box}
              />
              <FilterPopupButton className={styles.filter_btn} onClick={handleToggleFilters} />
              <Modal
                isOpen={isFiltersOpen}
                onClose={handleToggleFilters}
                className={styles.modal}
                id='filters-modal'
              >
                <Filters
                  filters={data?.meta.filters}
                  className={styles.filters_mob}
                  isTitle
                  isFooter
                  onClose={handleToggleFilters}
                  categoryId={categoryId}
                  currSort={currSort}
                />
              </Modal>
            </div>
            <ul className={styles.list}>
              {data?.data?.map(item => (
                <Item key={item.id} data={item} isCartButton />
              ))}
            </ul>
            {data?.meta.pagination.num_pages !== 1 && (
              <Pagination
                className={styles.pagination}
                amountPages={data?.meta.pagination.num_pages}
                currSort={currSort}
                categoryId={categoryId ?? ''}
                onClick={getCatalogItemsFx}
                onBtnLoadClick={updateCatalogItemsBtnFx}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
