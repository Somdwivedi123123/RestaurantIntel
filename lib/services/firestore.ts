import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  WhereFilterOp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

/**
 * Generic Firestore service for CRUD operations
 */
export class FirestoreService<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Create a new document
   */
  async create(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Get a document by ID
   */
  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  /**
   * Update a document
   */
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Delete a document
   */
  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  /**
   * Get all documents
   */
  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  /**
   * Query documents with filters
   */
  async query(
    filters: Array<{ field: string; operator: WhereFilterOp; value: any }>,
    orderByField?: string,
    limitCount?: number
  ): Promise<T[]> {
    let q = query(collection(db, this.collectionName));

    // Apply filters
    filters.forEach((filter) => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });

    // Apply ordering
    if (orderByField) {
      q = query(q, orderBy(orderByField, 'desc'));
    }

    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }
}

/**
 * Specific service instances
 */
import {
  Restaurant,
  MenuItem,
  Competitor,
  PerformanceMetrics,
  PricingRecommendation,
  AIInsight,
  Guest,
  HealthInspection,
} from '@/lib/types';

export const restaurantService = new FirestoreService<Restaurant>('restaurants');
export const menuItemService = new FirestoreService<MenuItem>('menuItems');
export const competitorService = new FirestoreService<Competitor>('competitors');
export const metricsService = new FirestoreService<PerformanceMetrics>('metrics');
export const pricingService = new FirestoreService<PricingRecommendation>('pricingRecommendations');
export const insightService = new FirestoreService<AIInsight>('insights');
export const guestService = new FirestoreService<Guest>('guests');
export const inspectionService = new FirestoreService<HealthInspection>('inspections');
