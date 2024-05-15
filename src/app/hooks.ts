import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

//import these from here instead of {useSelector, useDispatch}
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
